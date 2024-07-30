import { z } from 'zod';
import { validateSegurosSchema } from '../helpers/schemas';
import { ApiResponse } from '../../../../helpers';
import ApiClient from '../../../../helpers/ApiClient';
//import ApiClient from '../utils/ApiClient';

export async function segurosController(
  body: z.infer<typeof validateSegurosSchema>
) {
  const username = 'ingenieriaDigital';
  const password = '9YEL$m3Kcs?5';
  const ApiClientt = new ApiClient(
    'https://api-dev.medicatel.red/cotizar/vida/',
    username,
    password
  );

  let respose = await ApiClientt.post('seguros_plus', {
    edad: 25,
    sumaAsegurada: 200000.0,
    sexo: 'F',
  },

//   {
//     auth:{
//     username:username,
//     password:password 
//     }
//   }
);

  console.log(respose);

  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data:  respose.data ,
    title: 'Success',
  });
}
