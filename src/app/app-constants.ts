export class AppConstants {

    //public static get baseServer(): string { return "http://localhost:8080/" };

    public static get baseServer(): string { return "http://www.mikkaeru.com/" };

    public static get baseLogin(): string { return this.baseServer + "user-api/login" };

    public static get baseUrl(): string { return this.baseServer + "user-api/v1/users" };
    
    public static get baseUrlPath(): string { return this.baseServer + "user-api/v1" };
}
