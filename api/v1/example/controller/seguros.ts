import { z } from 'zod';
import { validateSegurosSchema } from '../helpers/schemas';
import { ApiError, ApiResponse } from '../../../../helpers';
import ApiClient from '../../../../helpers/ApiClient';
import Data from '../../../../tasas/tasasVidaInsure.json';
import { buscarDatosSeguro } from '../../../../helpers/functions';

export async function segurosController(
  body: z.infer<typeof validateSegurosSchema>
) {
    try {
        const username = 'ingenieriaDigital';
        const password = '9YEL$m3Kcs?5';

        const { edad, sumaAsegurada, sexo, fuma } = body;
      
        let resultado = await buscarDatosSeguro(Data, {edad,sumaAsegurada,sexo,fuma});
      
        const ApiClientt = new ApiClient('https://api-dev.medicatel.red/cotizar/vida/',username,password);

        let respose:any = await ApiClientt.post('seguros_plus', {edad,sumaAsegurada,sexo});
     
        return new ApiResponse({
          statusCode: 200,
          message: 'Cotizacion exitosa',
          success: true,
          data: {
            "SegurosPlus":respose.data['data'],
            "InSure":resultado
          },
          title: 'Success',
        }); 

      } catch (error) {

        return new ApiError({
            statusCode:500,
            message:'Error',
            data:error,
            title:"Error en el servidor"
        })

      }
  
}
