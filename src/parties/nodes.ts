export const partyNodeTypeDefs = `#graphql
  union PartyCreator = User | AdminGroup

  type Party @node(labels: ["Party"]) @mutation(operations: []) @authorization(
    filter: [
      { where: { node: { createdByConnection: { User: { node: { id: "$jwt.sub" } } } } } },
      { where: { node: { createdByConnection: { AdminGroup: { node: { createdBy: { id: "$jwt.sub" } } } } } } },
    ]
  ){
    id: ID! @id @unique
    createdAt: DateTime! @timestamp(operations: [CREATE]) @private
		updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE]) @private

    createdBy: PartyCreator! @relationship(type: "CREATED_PARTY", direction: IN) @settable(onCreate: true, onUpdate: false)
  }
`
