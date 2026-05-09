import hashlib
import time
import secrets
from fastapi import APIRouter
from api.schemas import BlockchainStoreRequest, BlockchainVerifyRequest

router = APIRouter()

# In-memory blockchain storage (simulated for hackathon)
blockchain_records: dict[str, dict] = {}


@router.post("/store")
async def store_report_hash(request: BlockchainStoreRequest):
    """
    Store a report hash on the blockchain.
    In production, this would call a Polygon smart contract.
    For the demo, it simulates the blockchain transaction.
    """
    report_hash = request.report_hash

    # Simulate blockchain transaction
    tx_hash = "0x" + secrets.token_hex(32)
    block_number = 45_000_000 + secrets.randbelow(1_000_000)
    timestamp = time.time()

    record = {
        "report_hash": report_hash,
        "transaction_hash": tx_hash,
        "block_number": block_number,
        "timestamp": timestamp,
        "contract_address": "0x7a23608a8eBe71868013BDE0d0b1234567890abc",
        "verified": True,
        "report_type": request.report_type,
        "network": "Polygon Amoy Testnet",
    }

    blockchain_records[report_hash] = record

    return {
        "success": True,
        "record": record,
        "message": "Report hash stored on Polygon blockchain (simulated)",
    }


@router.post("/verify")
async def verify_report(request: BlockchainVerifyRequest):
    """
    Verify if a report hash exists on the blockchain.
    """
    record = blockchain_records.get(request.report_hash)

    if record:
        return {
            "verified": True,
            "record": record,
            "message": "Report hash found and verified on blockchain",
        }
    else:
        return {
            "verified": False,
            "message": "Report hash not found on blockchain",
        }


@router.get("/records")
async def list_records():
    """List all blockchain verification records."""
    return {
        "total": len(blockchain_records),
        "records": list(blockchain_records.values()),
    }


@router.get("/contract")
async def get_contract_info():
    """Get smart contract information."""
    return {
        "contract_name": "HerChainVerifier",
        "network": "Polygon Amoy Testnet",
        "contract_address": "0x7a23608a8eBe71868013BDE0d0b1234567890abc",
        "functions": [
            {
                "name": "storeReportHash",
                "description": "Store a SHA-256 hash of a health report",
                "parameters": ["bytes32 _hash"],
            },
            {
                "name": "verifyReport",
                "description": "Verify if a hash exists in the registry",
                "parameters": ["bytes32 _hash"],
                "returns": "bool",
            },
            {
                "name": "getReportMetadata",
                "description": "Get metadata for a stored hash",
                "parameters": ["bytes32 _hash"],
                "returns": "(address registrar, uint256 timestamp)",
            },
        ],
        "solidity_version": "^0.8.20",
    }
