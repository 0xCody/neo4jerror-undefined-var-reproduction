export const userNodeTypeDefs = `#graphql
	type User @node(labels: ["User"]) @mutation(operations: []) @authorization(
		filter: [
			{ where: { node: { NOT: { blockedUsers_SOME: { to: { id: "$jwt.sub" } } } } } },
		]
	) {
		id: ID! @unique @settable(onCreate: true, onUpdate: false)
		createdAt: DateTime! @private
		updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE]) @private

		username: String! @unique

		blockedUsers: [UserBlockedUser!]! @relationship(type: "HAS_BLOCKED", direction: OUT)
		createdAdminGroups: [AdminGroup!]! @relationship(type: "CREATED_ADMIN_GROUP", direction: OUT)
	}

	type UserBlockedUser @node(labels: ["UserBlockedUser"]) @query(read: false, aggregate: false) @mutation(operations: []) @authorization(
		filter: [
			{ where: { node: { from: { id: "$jwt.sub" } } } }
		]
	) {
		id: ID! @id @unique
		createdAt: DateTime! @timestamp(operations: [CREATE]) @private
		updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE]) @private

		from: User! @relationship(type: "HAS_BLOCKED", direction: IN) @settable(onCreate: true, onUpdate: false)
		to: User! @relationship(type: "IS_BLOCKING", direction: OUT) @settable(onCreate: true, onUpdate: false)
	}
`
