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
import { SponsorCategory } from "../api"

export interface CompanyResource {
	name: string
	sponsor_type?: SponsorCategory | undefined
	logo?: string
	url?: string
}
