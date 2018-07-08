var Auction = artifacts.require("Auction");
expect = require("chai").expect;
//expect = require("web3").expect;
var contractAddress = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
var weiUnit = 1000000000000000000;

contract("Test Auction contract", function(accounts){
    describe("Deploy contract Auction", function(){
        it("the auction contract", function(){
            return Auction.new().then(function(instance){
                auctionContract = instance;
            });
        });
    });


    describe("check contract Value", function(){
        it("check the variable", function(){

            return auctionContract.manager().then(function(res){
                console.log("address: " + res);
                expect(res).to.be.equal(contractAddress);

            });

        });


        it("check the auction function", function(){
            // Firstly make an auction
            auctionContract.auction(2, {"from" : accounts[1]});
            return auctionContract.seller().then(function(res){
                console.log("seller: " + res);
                expect(res).to.be.equal(accounts[1]);

            });

        });

        it("check the current auction price", function(){
            // make a bit that lower then the latestBid
            var bidTxObject = {
                from: accounts[2],
                value: web3.toWei('3', 'ether')
            };

            auctionContract.bid(bidTxObject);

            console.log("Submitted the new bid");

        });

    });



    describe("check contract new Value", function(){
        it("check the current auction price", function(){
            return auctionContract.latestBid().then(function(res){
                console.log("latestBid: " + res);
                expect(res / weiUnit).to.be.equal(3);
            });

        });


    });
})
