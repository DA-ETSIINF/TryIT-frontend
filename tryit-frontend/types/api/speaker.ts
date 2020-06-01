/**
 * Try IT! API
 * Official API for the Try IT! congress
 *
 * OpenAPI spec version: 1.0.0
 * Contact: maximo.garcia.martinez@alumnos.upm.es
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { PersonType } from "./person"
import { CompanyResource } from "./company"

export interface SpeakerResource extends PersonType {
	web?: string
	company: CompanyResource
}
