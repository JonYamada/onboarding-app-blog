interface IReactContext {
  host: string
  href: string
  httpAcceptLanguage: string
  i18nDefaultLocale: string
  i18nLocale: string
  inMailer: boolean
  location: string
  pathname: string
  port: 3000
  railsEnv: string
  rorPro: boolean
  rorVersion: string
  routes: {
    root: string,
    articles: {
      index: string
      new: string
      create: string
    }
  }
  scheme: string
  search: null
  serverSide: boolean
}

export {IReactContext}
