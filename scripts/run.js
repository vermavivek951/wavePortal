const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract addy: ",waveContract.address);
  
    /* 
     * Get contract balance
     */

    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );

    console.log(
      "Contract balance: ",
      hre.ethers.utils.formatEther(contractBalance)
    );


   //Let's send a few waves  
    const waveTxn = await waveContract.wave("Dragon Fruit #1");
    await waveTxn.wait(); //wait for the transaction to be mined

    const waveTxn2 = await waveContract.wave("Dragon Fruit #2");
    await waveTxn2.wait(); //wait for the transaction to be mined

    contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );

    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getTotalWaves();
    console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
