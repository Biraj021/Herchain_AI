// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HerChainVerifier
 * @dev Smart contract for storing and verifying health report hashes
 * @notice Only stores cryptographic hashes — NEVER personal health data
 * 
 * Deployed on: Polygon Amoy Testnet
 * Purpose: Verify AI-generated health reports are authentic and untampered
 */
contract HerChainVerifier {
    struct ReportRecord {
        address registrar;
        uint256 timestamp;
        string reportType;
        bool exists;
    }

    // Mapping from report hash to its record
    mapping(bytes32 => ReportRecord) public reportRegistry;
    
    // Total number of reports registered
    uint256 public totalReports;
    
    // Contract owner
    address public owner;

    // Events
    event ReportRegistered(
        bytes32 indexed reportHash,
        address indexed registrar,
        string reportType,
        uint256 timestamp
    );

    event ReportVerified(
        bytes32 indexed reportHash,
        bool verified,
        uint256 timestamp
    );

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Store a report hash on the blockchain
     * @param _hash The SHA-256 hash of the health report
     * @param _reportType Type of report (e.g., "AI Health Assessment")
     */
    function storeReportHash(bytes32 _hash, string memory _reportType) public {
        require(!reportRegistry[_hash].exists, "Report hash already registered");
        
        reportRegistry[_hash] = ReportRecord({
            registrar: msg.sender,
            timestamp: block.timestamp,
            reportType: _reportType,
            exists: true
        });
        
        totalReports++;
        
        emit ReportRegistered(_hash, msg.sender, _reportType, block.timestamp);
    }

    /**
     * @dev Verify if a report hash exists on the blockchain
     * @param _hash The hash to verify
     * @return bool Whether the report is verified
     */
    function verifyReport(bytes32 _hash) public view returns (bool) {
        return reportRegistry[_hash].exists;
    }

    /**
     * @dev Get metadata for a stored report hash
     * @param _hash The hash to look up
     * @return registrar The address that registered the hash
     * @return timestamp When the hash was registered
     * @return reportType Type of the report
     */
    function getReportMetadata(bytes32 _hash) public view returns (
        address registrar,
        uint256 timestamp,
        string memory reportType
    ) {
        require(reportRegistry[_hash].exists, "Report not found");
        ReportRecord memory record = reportRegistry[_hash];
        return (record.registrar, record.timestamp, record.reportType);
    }

    /**
     * @dev Consent management — allows user to revoke a report
     * @param _hash The hash of the report to revoke
     */
    function revokeConsent(bytes32 _hash) public {
        require(reportRegistry[_hash].exists, "Report not found");
        require(
            reportRegistry[_hash].registrar == msg.sender,
            "Only the registrar can revoke"
        );
        
        delete reportRegistry[_hash];
        totalReports--;
    }
}
