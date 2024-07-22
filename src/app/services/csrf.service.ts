import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {


  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        // Safely handle the case where `pop()` might be undefined
        const cookieValue = parts.pop();
        if (cookieValue) {
            return cookieValue.split(';').shift() || null; // Use `|| null` to handle cases where `shift()` might return `undefined`
        }
    }
    return null; // Return null if cookie is not found
}

}
