pragma solidity ^0.4.15;

/* This contract is our implementation of how voting should be done for shareholders in a company */

import "./Token.sol";

contract VotingMechanism {

  	address admin;
  	Token tok;
    uint[] totalVotes;
    uint numOptions;
    uint voteID;

  	struct Vote {
        bytes32 blindedVote;
      	bool voted;
        bool revealed;
    }

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
    }

    modifier isRevealing() {
        require(state == VotingState.Revealing);
        _;
    }

    modifier notYetRevealed() {
        require(voters[msg.sender].voted && !voters[msg.sender].revealed);
        _;
    }

    modifier validCommitment(bytes32 secret, uint[] votes) {
        require(keccak256(secret,votes) == voters[msg.sender]);
      	_;
    }

    modifier isStandby() {
        require(state == VotingState.Standby);
        _;
    }

    function VotingMechanism(address _admin, address _token) public {
      	admin = _admin;
      	tok = Token(_tokenaddr);
    }

    function vote(bytes32 _vote) isVoting() notYetVoted() {
        voters[msg.sender] = Vote(_vote, true, false);
    }

  	/* reveal real votes */
    function reveal(bytes32 secret, uint[] values) isRevealing() validCommitment(secret, votes) notYetRevealed() {
        if (tok.balancesOf(msg.sender) < max(values) {
            tok.forceUpdate(msg.sender, 0);
            return;
        }
        for (uint i = 0; i < numOptions; i++) {
            totalVotes[i] += values[i];
        }
        voters[msg.sender].revealed = true;
    }

	/* force charge and unlock */
    function unlock() isStandby() {
        if (!voters[msg.sender].revealed)
    }

    /* if a voter does not reveal in time, then he loses all access to his tokens */
    function punish() {

    }



}
