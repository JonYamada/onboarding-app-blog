interface IRailsContext {
  host: string
  href: string
  httpAcceptLanguage: string
  i18nDefaultLocale: string
  i18nLocale: string
  inMailer: boolean
  location: string
  pathname: string
  port: number
  railsEnv: string
  rorPro: boolean
  rorVersion: string
  routes: IRoutes
  scheme: string
  search: string
  serverSide: boolean
}

interface IRoutes {
  root: string,
  articles: {
    index: string
    new: string
    create: string
  }
}

export {IRailsContext, IRoutes}
