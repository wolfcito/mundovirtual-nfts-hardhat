//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";
import "./BaseDNA.sol";

contract MundoVirtualPunk is ERC721, ERC721Enumerable, BaseDNA {
    using Counters for Counters.Counter;

    Counters.Counter private _idCounter;
    uint256 public maxSuply;
    mapping(uint256 => uint256) public tokenDNA;

    constructor(uint256 _maxSuply) ERC721("MundoVirtualPunks", "MVP") {}

    function mint() public {
        uint256 current = _idCounter.current();
        require(current < maxSuply, "No Virtualitos left");

        tokenDNA[current] = deterministicPseudoRandomDNA(current, msg.sender);
        _safeMint(msg.sender, current);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721 Metadata: URI query for nonexistent token"
        );

        string memory jsonURI = Base64.encode(
            abi.encodePacked(
                '{ "name": "MundoVirtualPunks #',
                _tokenId,
                '", "description": "MundoVirtual NFT that allow interact with the future Dapp", "image": "',
                "// TO-DO: Calculate image URL",
                '"}'
            )
        );

        return
            string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
