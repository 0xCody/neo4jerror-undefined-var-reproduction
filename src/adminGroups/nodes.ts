export const adminGroupNodeTypeDefs = `#graphql
  type AdminGroup @node(labels: ["AdminGroup"]) @mutation(operations: []) @authorization(
    filter: [
      { where: { node: { createdBy: { id: "$jwt.sub" } } } },
    ]
  ) {
    id: ID! @id @unique
    createdAt: DateTime! @timestamp(operations: [CREATE]) @private
		updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE]) @private

    createdBy: User! @relationship(type: "CREATED_ADMIN_GROUP", direction: IN) @settable(onCreate: true, onUpdate: false)
  }
`
