//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IBridge.sol";

contract L1Contract {
    address l1Bridge;

    constructor(address _l1Bridge) {
      l1Bridge = _l1Bridge;
    }

    function sendMessageToL2(address _to, bytes memory _calldata, uint256 fee) payable public {
      uint256 deadline = 999999999999;

      IBridge bridge = IBridge(l1Bridge);
      bridge.dispatchMessage{value: msg.value}(
        _to,
        fee,
        deadline,
        _calldata
      );
    }
}
