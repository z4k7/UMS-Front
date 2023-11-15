import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import { retrieveUsersSuccess, retrieveProfileSuccess, retrieveUsers, retrieveProfile } from "./user.actions";
import { User } from "src/app/models/user.model";
import { switchMap, map, catchError } from "rxjs/operators";  // Import catchError
import { Observable, of } from "rxjs";  // Import Observable and of if not already imported

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(retrieveProfile),
            switchMap(() =>
                this.userService.loadProfile().pipe(
                    map((data) => retrieveProfileSuccess({ userDetails: data as User })),
                  
                )
            )
        )
    );

    loadAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(retrieveUsers),
            switchMap(() => {
                return this.userService.loadUsers().pipe(
                    map((data) => retrieveUsersSuccess({ allUsers: data as User[] })),
                    
                )
            })
        )
    );
}
