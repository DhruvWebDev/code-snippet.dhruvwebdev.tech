import {describe, it} from "node:test"
import request, { BASE_URL }  from "./request-path"

describe("Auth Endpoints", () => {
    it("If new user sign-in using username and password", () => {
        request.login({username: "test", password: "test"}).then((res) => {
            expect(res.status).toBe(200)
        })
    })
    it("if user already exist send error login", () => {
        request.login({username: "test", password: "test"}).then((res) =>
            expect(res.status).toBe(400)
        )
        })
    })
    it("it should send error if a new user tries to login", () => {
        request.login({username: "test", password: "test"}).then((res) =>
            expect(res.status).toBe(400)
        )
    })
    it("it should successfully login if user exist in the database", () => {
        request.login({username: "test", password: "test"}).then((res) =>
            expect(res.status).toBe(200)
        )
    })

describe("fetch code  snippets", () => {
    it("Fetch all the snippet for the landing page mongo", () => {
        request.snippets().then((res) => {
            expect(res.status).toBe(200)
        })
    })

    it("fetch snippets by the id from the mongodb", () => {
        request.snippetsById(1).then((res) => {
            expect(res.status).toBe(200)
            })
    })
})

describe("ADMIN DASHBOARD ENDPOINT WHO WILL ADD OR REMOVE THE CODE SNIPPET", () => {
    it("It should remove the code snippet from the db", () => {
        request.removeSnippet(1).then((res) => {
            expect(res.status).toBe(200)
        })
    })
    it("It should add the code snippet", () => {
        request.addSnippet({title: "test", description: "test", code: "test"}).then((res) => {
            expect(res.status).toBe(200)
        })
    })

    it("It should update the code snippet", () => {
        request.updateSnippet(1, {title: "test", description: "test", code: "test"}).then((res) => {
            expect(res.status).
    })
})
})
