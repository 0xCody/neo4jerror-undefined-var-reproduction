import {Driver} from 'neo4j-driver'

export interface JWTDataPayload {
  tokenType: string
  exp: number
  iat: number
  jti: string
  sub: string
}

export interface ContextValue {
  jwt?: JWTDataPayload
  driver: Driver
}

