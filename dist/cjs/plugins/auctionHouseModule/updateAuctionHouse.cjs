'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errors = require('./errors.cjs');
var createUpdateAuctionHouseInstructionWithSigners = require('../../programs/auctionHouse/instructions/createUpdateAuctionHouseInstructionWithSigners.cjs');
var Operation = require('../../types/Operation.cjs');
var findAssociatedTokenAccountPda = require('../../programs/token/pdas/findAssociatedTokenAccountPda.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'UpdateAuctionHouseOperation';
const updateAuctionHouseOperation = Operation.useOperation(Key);
// -----------------
// Handler
// -----------------
const updateAuctionHouseOperationHandler = {
  handle: async (operation, metaplex) => {
    const response = await metaplex.rpc().sendAndConfirmTransaction(updateAuctionHouseBuilder(metaplex, operation.input), undefined, operation.input.confirmOptions);
    return {
      response
    };
  }
}; // -----------------
// Builder
// -----------------

const updateAuctionHouseBuilder = (metaplex, params) => {
  var _params$authority, _params$payer, _params$newAuthority, _params$treasuryMint, _params$feeWithdrawal, _params$sellerFeeBasi, _params$requiresSignO, _params$canChangeSale;

  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : metaplex.identity();
  const payer = (_params$payer = params.payer) !== null && _params$payer !== void 0 ? _params$payer : metaplex.identity();
  const auctionHouse = params.auctionHouse;
  const newAuthority = (_params$newAuthority = params.newAuthority) !== null && _params$newAuthority !== void 0 ? _params$newAuthority : auctionHouse.authority;
  const treasuryMint = (_params$treasuryMint = params.treasuryMint) !== null && _params$treasuryMint !== void 0 ? _params$treasuryMint : auctionHouse.treasuryMint;
  const feeWithdrawalDestination = (_params$feeWithdrawal = params.feeWithdrawalDestination) !== null && _params$feeWithdrawal !== void 0 ? _params$feeWithdrawal : auctionHouse.feeWithdrawalDestination;
  let treasuryWithdrawalDestinationOwner;
  let treasuryWithdrawalDestination;

  if (auctionHouse.usesSol()) {
    var _params$treasuryWithd;

    treasuryWithdrawalDestinationOwner = (_params$treasuryWithd = params.treasuryWithdrawalDestinationOwner) !== null && _params$treasuryWithd !== void 0 ? _params$treasuryWithd : auctionHouse.treasuryWithdrawalDestination;
    treasuryWithdrawalDestination = treasuryWithdrawalDestinationOwner;
  } else if (params.treasuryWithdrawalDestinationOwner) {
    treasuryWithdrawalDestinationOwner = params.treasuryWithdrawalDestinationOwner;
    treasuryWithdrawalDestination = findAssociatedTokenAccountPda.findAssociatedTokenAccountPda(treasuryMint, treasuryWithdrawalDestinationOwner);
  } else {
    throw new errors.TreasureDestinationOwnerRequiredError();
  }

  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).add(createUpdateAuctionHouseInstructionWithSigners.createUpdateAuctionHouseInstructionWithSigners({
    treasuryMint,
    payer,
    authority,
    newAuthority,
    feeWithdrawalDestination,
    treasuryWithdrawalDestination,
    treasuryWithdrawalDestinationOwner,
    auctionHouse: auctionHouse.address,
    args: {
      sellerFeeBasisPoints: (_params$sellerFeeBasi = params.sellerFeeBasisPoints) !== null && _params$sellerFeeBasi !== void 0 ? _params$sellerFeeBasi : null,
      requiresSignOff: (_params$requiresSignO = params.requiresSignOff) !== null && _params$requiresSignO !== void 0 ? _params$requiresSignO : null,
      canChangeSalePrice: (_params$canChangeSale = params.canChangeSalePrice) !== null && _params$canChangeSale !== void 0 ? _params$canChangeSale : null
    },
    instructionKey: params.instructionKey
  }));
};

exports.updateAuctionHouseBuilder = updateAuctionHouseBuilder;
exports.updateAuctionHouseOperation = updateAuctionHouseOperation;
exports.updateAuctionHouseOperationHandler = updateAuctionHouseOperationHandler;
//# sourceMappingURL=updateAuctionHouse.cjs.map
