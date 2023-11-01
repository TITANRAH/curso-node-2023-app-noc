interface ChekServiceUseCase {
  execute(url: string): Promise<boolean>;
}
// esto revisa cualquier url
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements ChekServiceUseCase {

  constructor(
    private readonly successCalback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,

  ){

  }

  public async execute(url: string): Promise<boolean> {




    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      this.successCalback();

      console.log(`${url} is ok`);
      
      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      console.log(`${error}`);

      return false;
    }
  }
}
