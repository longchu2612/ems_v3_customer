import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, count, map, observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getList(path, params = '') {
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.get(`${path}${params ? '?' + params : ''}`, { headers: header }).pipe(map(v => v['data'] ? v['data'] : v))
    }
    getListpost(table,data , type = 'admin') {
        return this.httpClient.post(`${table}`, data)
      }
    getListData(table , type = 'admin') {
    return this.httpClient.get(`${table}`)
    }
    putListData(table ,data, type = 'admin') {
        return this.httpClient.put(`${table}`, data)
        }
    submitPost(path, data) {
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.post(`${path}`, data, { headers: header })
    }

    submitLoa(message, type = 1) {
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.post('https://test_vietbot.vpn1.vccsmart.vn/', { data: message, type }, { headers: header })
    }

    newsubmitLoa(amount) {
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.post('https://api-aiopay.tomotek.vn/tomspeaker/payloud', { amount }, { headers: header })
    }

    login(username: string, password: string) {
        const userFor = { username: username, password: password }
        return this.httpClient.post('http://150.95.113.52:8080/api/auth/login', userFor)
    }
    //tạo
    getOdersreVenue(count: number, name: string, total: number, start: number, end: number, userID: number) {
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.get('https://api-apos.tomotek.vn/api/v1/admin/orders/revenue', {
            headers: header, params: {
                start: start,
                end: end
            }
        });
    }

    getInforAccount(updated_at: number, name: string, phone: number, email: string) {
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.get('https://api-apos.tomotek.vn/api/v1/admin/users/detail', { headers: header });

    }

    signUp(name: string, email: string, username: string, phone: number, password: string) {
        const userFor = { name: name, email: email, username: username, phone: phone, password: password }
        return this.httpClient.post('https://api-apos.tomotek.vn/api/v1/admin/users/register', userFor)
    }

    changeProfile(name: string, phone: string, email: string) {
        const userFor = { name: name, phone: phone, email: email }
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.post('https://api-apos.tomotek.vn/api/v1/admin/users/change-profile', userFor, { headers: header })
    }

    changePassword(old_password: string, new_password: string) {
        const userFor = { old_password: old_password, new_password: new_password }
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        console.log(header)
        return this.httpClient.post('https://api-apos.tomotek.vn/api/v1/admin/users/change-password', userFor, { headers: header })
    }

    createQR(amount: number, mid: string) {
        const userFor = { amount: amount, mid: mid }
        // const token = sessionStorage.getItem('access_token')
        // const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token})
        return this.httpClient.post('https://api-aiopay.tomotek.vn/tomspeaker/create-qr', userFor)
    }

    payLoud(amount: number, mid: string) {
        const userFor = { amount: amount, mid: mid }
        return this.httpClient.post('https://api-aiopay.tomotek.vn/tomspeaker/payloud', userFor)
    }

    newOder(data) {
        return this.httpClient.post('https://api-aiopay.tomotek.vn/tomspeaker/neworder', data)
    }

    callPayment(data) {
        return this.httpClient.post('https://api-aiopay.tomotek.vn/tomspeaker/callpayment', data)
    }

    getProductsList(name: string, price: number) {
        const token = sessionStorage.getItem('access_token')
        const header = new HttpHeaders({ 'Authorization': 'Bearer ' + token })
        return this.httpClient.get('http://api-apos.tomotek.vn/api/v1/admin/products/list', { headers: header })
    }
}
