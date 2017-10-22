pragma solidity ^0.4.15;

/* This contract is our implementation of how voting should be done for shareholders in a company */

import "./Token.sol";

contract VotingMechanism {
<<<<<<< HEAD

  	address admin;
  	Token tok;
    uint[] totalVotes;
    uint numOptions;
    uint voteID;

  	struct Vote {
=======
  
    address admin;
    Token tok;
    enum VotingState {Voting, Revealing, Finished}
    struct VotingSession {
        /* What is your favo? 1. opfjdsa 2.dfjkaslf 3.fdjkslajf */
        string question;
        uint[] totalVotes;
        uint numOptions;
        uint startingPhaseTime;
        uint phaseLength;
        VotingState state;
        mapping (address => Vote) voters;
    }
    uint currentSession = 0;
    mapping (uint => VotingSession) votingSessions;
    // Last session that each user has participated in  
    // If last voting session is 0, then the user can vote again
    mapping (address => uint) lockedSessions; 
  
    //interest would be like 1.001 * 10^18, so that interest/interestFactor = 1 + interest percentage
    uint interestFactor = 10**18;
    //needs to be a uint cuz solidity doesn't do floats -_-
    uint interest = (101)*(10**16);
    //interest should really be a construction / config parameter
    struct Vote {
        /* H(_vote[]||secret) stored here for each voter */
>>>>>>> 69a5feb2938d28f45dc3a092a58d765132417eee
        bytes32 blindedVote;
        bool voted;
        bool revealed;
        uint[] values;
    }
<<<<<<< HEAD

  	enum VotingState {Standby, Voting, Revealing};

    VotingState state;

 	/* H(vote||secret) stored here for each voter */
  	mapping (address => Vote) voters;

    modifier isVoting() {
        require(state == VotingState.Voting);
        _;
    }

  	modifier notYetVoted() {
        require(!voters[msg.sender].voted);
        _;
=======
    
    modifier isVoting() { require(votingSessions[currentSession].state == VotingState.Voting); _; }
    modifier unlocked() { require(lockedSessions[msg.sender] == 0); _; }
    /* so that they can't vote twice */
    modifier notYetVoted() { require(!voteingSessions[currentSession].voters[msg.sender].voted); _; }
    modifier isAdmin() { require(msg.sender == admin); _; }
    modifier isRevealing() { require(votingSessions[currentSession].state == VotingState.Revealing);_; }
    modifier notYetRevealed() { require(votingSessions[currentSession].voters[msg.sender].voted && !votingSessions[currentSession].voters[msg.sender].revealed); _; }
    modifier hasFunds(uint[] values) { require(tok.balancesOf(msg.sender) >= values[argmax(values)]; _; }
    modifier validCommitment(bytes32 secret, uint[] votes) { require(keccak256(secret,votes) == votingSession[currentSession].voters[msg.sender].blindedVote);_; }
    modifier isFinished() { require(currentSession == 0 || votingSessions[currentSession].state == VotingState.Finished);_; }
    /* checks if the voter is within phaseLength for phase (VOTING or REVEAL) */
    modifier validPhaseTime() { require(block.timestamp - votingSessions[currentSession].startingPhaseTime < votingSessions[currentSession].phaseLength);_; }
    /* checks if the voter is past phaseLength to poke and change state */
    modifier isPastPhaseTime() { require(block.timestamp - votingSessions[currentSession].startingPhaseTime >= votingSessions[currentSession].phaseLength);_; }
    modifier checkValLength(uint[] values) { require(values.length == votingSessions[currentSession].totalVotes.length);_; }
  
    function VotingMechanism(address _admin, address _token) public {
        admin = _admin;
        tok = Token(_tokenaddr);
>>>>>>> 69a5feb2938d28f45dc3a092a58d765132417eee
    }
  
    /* Creates a new voting session with _question as question+ options and _numOptions options. 
       Checks that msg.sender = admin and previous voting session is finished or is the first session. */
    function newVotingSession(string _question, uint _numOptions, uint _phaseLength) isAdmin() isFinished() public {
        /* question:  what is your favo? 1. jkfdlasjfa 2.jkldfsjds 3.fjdklsajfds */
        currentSession += 1;
        votingSessions[currentSession] = VotingSession(_question, 
                                                       new uint[](_numOptions), 
                                                       _numOptions, 
                                                       currBlockTime, 
                                                       _phaseLength, 
                                                       VotingState.Voting);
    }
  
    /* Gets question and choices of current voting session's */
    function getQuestion() public constant returns (string) {
        return votingSessions[currentSession].question;
    }
  
    /* admin can poke contract to next phase voting -> reveal */
    function moveToReveal() isAdmin() isVoting() isPastPhaseTime() {
        votingSessions[currentSession].state = VotingState.Revealing;
        votingSessions[currentSession].startingPhaseTime = block.timestamp;
    }
  
    /* admin can poke contract to next phase reveal -> finish */
    function moveToFinish() isAdmin() isRevealing() isPastPhaseTime() {
        votingSessions[currentSession].state = VotingState.Finished;
    }
  
    /* create a vote takes in an input of a hashed secret key and your array of votes */
    function vote(bytes32 _vote) 
        isVoting() 
        notYetVoted() 
        validPhaseTime()
        unlocked()
    {
        votingSessions[currentSession].voters[msg.sender] = Vote(_vote, 
                                                                 true, 
                                                                 false, 
                                                                 new uint[](votingSessions[currentSession].numOptions));
        lockedSessions[msg.sender] = currentSession;  
    }
     
    /* reveal real votes */
    function reveal(bytes32 secret, uint[] values) 
        isRevealing() 
        validPhaseTime() 
        validCommitment(secret, votes) 
        notYetRevealed() 
        hasFunds(values)
        checkValLength(values)
    {
        for (uint i = 0; i < votingSessions[currentSession].numOptions; i++) {
            votingSessions[currentSession].totalVotes[i] += values[i];
        }
        votingSessions[currentSession].voters[msg.sender].values = values;
        votingSessions[currentSession].voters[msg.sender].revealed = true;
    }
<<<<<<< HEAD

  	/* reveal real votes */
    function reveal(bytes32 secret, uint[] values) isRevealing() validCommitment(secret, votes) notYetRevealed() {
        if (tok.balancesOf(msg.sender) < max(values) {
            tok.forceUpdate(msg.sender, 0);
            return;
=======
    
    /* force charge and unlock */
    function unlock() isFinished() {
        if (!votingSessions[lockedSessions[msg.sender]].voters[msg.sender].revealed) {
            slash(msg.sender);
        } else {            
            uint charge = computeCharge();
            tok.forceUpdate(msg.sender, (tok.balancesOf(msg.sender)*interest)/interestFactor - charge);
>>>>>>> 69a5feb2938d28f45dc3a092a58d765132417eee
        }
      /* can vote again */
      lockedSessions[msg.sender] = 0;
    } 
    
    /* finds the winning value from totalVotes */
    function findWinningValue() {
      return argmax(totalVotes);
        
    }
  
    /* slash funds when you don't reveal in time */
    function didntReveal() {
      
        //punish()
    }
  
    /* if winner with total votes is different than winner with (totalvotes - your votes) then your 
       vote was decisive, and you should be charged the amount charged, is the margin by which the alterntive
       winner would have won by which is less than your vote for the winning value, since your vote was decisive */
    function computeCharge() returns (uint) {
        uint numOptions = votingSessions[currentSession].numOptions;
        uint[] altVotes = new uint[](numOptions);
        for (uint i = 0; i < numOptions; i++) {
            altVotes[i] = votingSessions[currentSession].totalVotes[i] - votingSessions[currentSession].values[i]
        }
        uint real_Winner = argmax(totalvotes)
        uint alt_winner = argmax(altvotes)
        if (real_winner != alt_winner) {
        return altvotes[alt_winner] - altvotes[real_winner];
        } else return 0;
    }
<<<<<<< HEAD

	/* force charge and unlock */
    function unlock() isStandby() {
        if (!voters[msg.sender].revealed)
=======
  
    function argmax(uint[] values) returns (uint) {
        uint maxVal, idx;
        for (uint i; i < values.length; i++) {
            if (values[i] > maxVal) {
                maxVal = values[i];
                idx = i
            }
        }
        return idx;
>>>>>>> 69a5feb2938d28f45dc3a092a58d765132417eee
    }
    
  
    /* if a voter does not reveal in time, then he loses all access to his tokens */
    function slash(address account) private {
        tok.forceUpdate(account, 0);
    }
<<<<<<< HEAD



=======
  
  
  
>>>>>>> 69a5feb2938d28f45dc3a092a58d765132417eee
}
