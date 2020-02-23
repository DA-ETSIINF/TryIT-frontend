import { Module, Mutation, VuexModule, getModule, Action } from "vuex-module-decorators"
import { TicketResource, UPMSchools } from "~/types/api"
import {
	FormType,
	Indexes,
	StatusOnInput,
	DynamicFormModule,
	InputValueType,
	SelectInputType,
	OptionSelected
} from "~/types/components"
import { ticketForm as tf } from "./template-forms"
import { store } from "~/store"
import { getHTTP, schoolsUPM } from "../utils"
import axios from "axios"

@Module({ dynamic: true, store, name: "ticket", stateFactory: true, namespaced: true })
export default class Ticket extends VuexModule {
	ticket!: TicketResource
	ticketForm: FormType = this.getForm()

	get getTitle(): string | undefined {
		return this.ticketForm.title
	}

	get getDescription(): string | undefined {
		return this.ticketForm.description
	}

	get getTicketForm(): FormType {
		return this.ticketForm
	}

	get getFormModule(): DynamicFormModule {
		return this.ticketForm.formModule
	}

	getForm() {
		tf.sections.forEach((section, sectionIndex) => {
			section.inputs.forEach((input, inputIndex) => {
				const indexes = {
					section: sectionIndex,
					input: inputIndex
				}
				tf.sections[sectionIndex].inputs[inputIndex].indexes = indexes
				const requires = tf.sections[sectionIndex].inputs[inputIndex].requires
				tf.sections[sectionIndex].inputs[inputIndex].show = !(requires && requires.length > 0)
				if (
					tf.sections[sectionIndex].inputs[inputIndex].tag === "select-input" &&
					input.id === "schools-selection"
				) {
					axios
						.get(schoolsUPM, {
							headers: {
								"Content-type": "application/json"
							}
						})
						.then(data => {
							const schools: OptionSelected[] = data.data.map(s => {
								return { title: s.nombre, id: s.codigo }
							})
							const schoolsOptions: OptionSelected[][] = [[]]
							const schoolsByDefault = ["10"]
							schoolsByDefault.forEach(school => {
								const i = schools
									.map(s => {
										return s.id
									})
									.indexOf(school)
								schoolsOptions[0].push(schools[i])
								schools.splice(i, 1)
							})
							schoolsOptions.push(schools)
							this.updateProperty({ key: "options", value: schoolsOptions, indexes })
						})
				}
			})
		})
		return tf
	}

	private async getUpmInfo() {
		// const indexes: Indexes = {
		// 	section: 1,
		// 	input: 1
		// }
		// get("https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/centro.json").then(payload => {
		// 	store.commit("ticket/updateProperty", { key: "options", payload, indexes })
		// })
	}

	@Mutation
	updateInput({ key, value, indexes }: { key: string; value: InputValueType; indexes: Indexes }) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		this.ticketForm.sections[indexes.section].inputs[indexes.input][key] = value
	}

	@Mutation
	updateProperty({
		key,
		value,
		indexes
	}: {
		key: string
		value: InputValueType | OptionSelected[][]
		indexes: Indexes
	}) {
		if (indexes.section === undefined || indexes.input === undefined) {
			return
		}
		console.log(value)
		this.ticketForm.sections[indexes.section].inputs[indexes.input].properties[key] = value
	}

	@Mutation
	updateIndexes({ sectionIndex, inputIndex }: { sectionIndex: number; inputIndex: number }) {
		this.ticketForm.sections[sectionIndex].inputs[inputIndex].indexes = {
			section: sectionIndex,
			input: inputIndex
		}
	}

	@Mutation
	updateErrorOnInput({ indexes, status }: { indexes: Indexes; status: StatusOnInput }) {
		store.commit("ticket/updateProperty", { key: "status", value: status, indexes })
		store.commit("ticket/updateProperty", {
			key: "helperText",
			value: status.statusDetail.message,
			indexes
		})
	}
	@Action
	postTicket() {
		// post({ ticketForm: this.ticketForm }, "/ticket")
	}
}
export const TicketModule = getModule(Ticket)
