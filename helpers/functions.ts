import SeguroArray from '../api/v1/example/interfaces/seguroArray';
import SeguroIT from '../api/v1/example/interfaces/seguro';

export async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function generateCode(lenght: number) {
  var letters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
  var numbers: string = '1234567890';
  var code: string = '';
  //numero random entre 1 y 2
  for (var i = 0; i < lenght; i++) {
    let randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber == 1) {
      var letter = letters[Math.floor(Math.random() * letters.length)];
      code += letter;
    } else {
      var number = numbers[Math.floor(Math.random() * numbers.length)];
      code += number;
    }
  }
  return code;
}

export async function passwordGenerator(largo: number): Promise<string> {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const mayuscula = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const numeros = '0123456789';
  const minuscula = 'abcdefghijklmnopqrstuvwxyz';

  let contrasena = '';

  // Agregar un carácter de cada tipo en lugares aleatorios
  contrasena +=
    mayuscula[Math.floor(Math.random() * mayuscula.length)] +
    simbolos[Math.floor(Math.random() * simbolos.length)] +
    numeros[Math.floor(Math.random() * numeros.length)] +
    minuscula[Math.floor(Math.random() * minuscula.length)];

  // Completar la contraseña con caracteres aleatorios
  for (let i = 4; i < largo; i++) {
    contrasena += caracteres[Math.floor(Math.random() * caracteres.length)];
  }

  // Mezclar los caracteres para hacer la contraseña más aleatoria
  contrasena = contrasena
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return contrasena;
}

// encontrar datos en el json
export async function buscarDatosSeguro(
  array: SeguroArray[],
  filter: SeguroIT
): Promise<SeguroIT | null> {

  const result = array.find((f) => f.Edad === filter.edad);

  if (!result) {
    return null;
  }

  let tasa: any;
  if (filter.sexo === 'M') {
    tasa = filter.fuma === 'S' ? result.hombreFumador : result.hombreNoFumador;
  } else {
    tasa = filter.fuma === 'S' ? result.mujerFumadora : result.mujerNoFumadora;
  }

  tasa = tasa || 0;
  const primaAnual = (tasa / 1000) * filter.sumaAsegurada;

  return {
    primaAnual: primaAnual,
    sumaAsegurada: filter.sumaAsegurada,
    sexo: filter.sexo,
    edad: filter.edad,
    fuma: filter.fuma
  };
}
