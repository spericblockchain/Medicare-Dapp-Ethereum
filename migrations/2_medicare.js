/** @format */

const Medicare = artifacts.require('Medicare')

module.exports = function(deployer) {
  deployer.deploy(Medicare)
}
