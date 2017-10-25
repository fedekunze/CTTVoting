
# Athena

## Project Overview & Motivation

Getting shareholders involved in corporate decisions has always been a problem that didn’t have a clear solution. According to [CNN](http://buzz.money.cnn.com/2014/06/12/shareholders-dont-vote/), “Just 27% of shareholders bother to vote.” They don’t feel that they can make an impact with the voting power that they have. That’s where Athena comes in. Athena implements a voting scheme ([CTT](https://www.jstor.org/stable/1831271) Voting) where shareholders can vote according to their true preferences, based on the amount of shares they own.  It also rewards those who participate with interest. This mechanism is socially optimal because it picks the outcome that benefits everyone the most, and incentivizes honest reporting of each voter’s preferences. The Athena platform also has functionality to allow businesses, Decentralized Autonomous Organizations (DAOs), and other governing organizations to use alternate voting mechanisms if CTT Voting doesn’t work for them.

## Protocol & Incentives

Each voter is assigned a certain number of tokens proportional to their share of the company. Then, the administrative board can use the Athena platform to ask a question and present a certain number of options. Each voter stakes a certain number of their coins on each option (0 to 100%). Afterwards, the staked coins are aggregated and a winning option is chosen. Then, each voter is subjected to a Clarke Tax, which is computed as follows: for each voter, an alternative tally is calculated in which that voter did not vote. If the alternate winner is different from the original one, then the margin by which the alternate winner won is charged to the voter. This way, each voter is charged based on the influence of their vote. In order to incentivize members to vote, voters all receive a small amount of interest at the end of the phase. To keep the game theory mechanisms secure, all the charged tokens are burned.

## Use Cases

Since all the accounts should be verified internally, the primary use case is for companies who are interested in greater shareholder participation. However, if [proof-of-individuality](http://proofofindividuality.online) is implemented, or some other workaround is found, then CTT voting can also be used for DAOs and other governing organizations.

## Implementation

### Dependencies

- [React.js](https://reactjs.org/docs/installation.html)
- [Solidity](https://solidity.readthedocs.io/en/develop/installing-solidity.html)
- [Testrpc](https://github.com/ethereumjs/testrpc)
- [Truffle](http://truffleframework.com/)

### Documentation

To run the web app:

`$ testrpc`

Go to the frontend folder:

`$ cd ctt_frontend`

In the project directory, type:

`$ npm start`

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Authors

- [Jeremiah Andrews](https://www.linkedin.com/in/jeremiah-andrews-779989122/)
- [Saroj Chintakrindi](https://www.linkedin.com/in/saroj-chintakrindi-03206641/)
- [Kevin Chang](https://www.linkedin.com/in/kchang87/)
- [Federico Kunze](https://www.linkedin.com/in/fekunze/)
- [Avneet Saini](https://www.linkedin.com/in/avneet-saini-38a210109/)
- [Tammy Vu](https://www.linkedin.com/in/tammyvu/)

All authors are members of [Blockchain at Berkeley](https://blockchain.berkeley.edu/)
