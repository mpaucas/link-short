import { json, LoaderArgs,  } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderArgs){
  const url = new URL(request.url);
  const errorParam = url.searchParams.get('error');
  const successParam = url.searchParams.get('success');

  const data = {
    error: errorParam,
    success: successParam
  }


  return json(data)
}

export default function Index() {

  const { error, success } = useLoaderData();


  return (
    <div>
      <h1>Acortador de URLs</h1>
      <form method="post" action="/url">
        <input type="text" name="original" id="original" placeholder="Ingrese url que desea acortar"/>
        <label> 
          { error == 'missing' && (
            <p className="error">Por favor, llena todos los campos</p>
          )}
          { error == 'unavailable' && (
            <p className="error">Ese nombre ya está en uso</p>
          )}
        </label>
        <input type="text" name="short" id="short" placeholder="Ingrese version corta de url (solo nombre)"/>
        <button type="submit">Acortar</button>
      </form>
      <label> 
          { success && (
            <p className="success">
              !Listo¡ Tu URL acortada es {''}
              <a href={`/${success}`}>{`${success}`}</a>
            </p>
          )}
        </label>
    </div>
  );
}
