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
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Acortador de URL's
            </h2>
          </div>
          <form className="mt-8 space-y-6" method="post" action="/url">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="original" className="sr-only">
                  URL original
                </label>
                <input
                  id="original"
                  name="original"
                  type="text"
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ingrese url que desea acortar"
                />
              </div>
              <div>
                <label htmlFor="short" className="sr-only">
                  URL corta
                </label>
                <input
                  id="short"
                  name="short"
                  type="text"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ingrese version corta de url (solo nombre)"
                />
              </div>
            </div>

            <br></br>

            <label> 
                { error == 'missing' && (
                  <div className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p className="error">Por favor, llena todos los campos</p>
                  </div>
                )}
                { error == 'unavailable' && (
                  <div className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p className="error">Ese nombre ya está en uso</p>
                  </div>
                )}
              </label>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Acortar
              </button>
            </div>
          </form>
          <div className='text-center py-4 lg:px-4'> 
            { success && (

              <div>
                <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                  <p className="font-bold">!Listo¡ Tu URL acortada es {''}</p>
                  <a href={`/${success}`} className="rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs text-white font-bold mr-3 text-center">
                    {`${success}`}
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
