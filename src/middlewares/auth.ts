export async function auth(request:any){

    await request.jwtVerify();

}