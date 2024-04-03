import { ValidationError } from 'class-validator'

export interface ResponseData {
    message: string
}

export interface ResponseError {
    data: ValidationError[]
    message: string
}

export type ResponseType = ResponseData | ResponseError
