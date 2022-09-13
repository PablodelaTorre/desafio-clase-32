import chai from "chai";
import { request } from "express";
import supertest from "supertest";
const assert = chai.assert



describe('FUNCIONALIDADES', () => {
    describe('Pruebas get login', () => {
        it('status 200',async () => {
            const respuesta = await supertest('http://localhost:8080').get('/login')
            assert.equal(respuesta,'status 200')
        })
    })

    describe('Pruebas get', () => {
        
    })

    describe('Pruebas get', () => {
        
    })

    describe('Pruebas get', () => {
        
    })
})