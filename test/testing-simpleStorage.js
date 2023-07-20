const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("Simple Storage Testing", function (){
  let simpleStorageFactory, simpleStorage 
  beforeEach(async function(){
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy() 
      
  })

  it("Initial favortieNumber of SimpleStorage is 0", async function(){
     const currentValue = await simpleStorage.retrieve()
     const expectedValue = "0"

     assert.equal(currentValue.toString(), expectedValue)


  })

  it("storing value in the contract", async function(){
    
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()

    assert.equal(currentValue.toString(), expectedValue)
  })
  it.only("Adding person to simpleStorage", async function(){
     const expectedPersonName = "Knight"
     const expectedFavoriteNumber = "16"
     const transactionResponse = await simpleStorage.addPerson(expectedPersonName,expectedFavoriteNumber)
     await transactionResponse.wait(1)
     const { favoriteNumber, name } = await simpleStorage.people(0)
     const nameMapping = await simpleStorage.nameToFavoriteNumber(expectedPersonName)
     assert.equal(name, expectedPersonName)
     assert.equal(favoriteNumber, expectedFavoriteNumber)
     assert.equal(nameMapping, expectedFavoriteNumber)
  })


})