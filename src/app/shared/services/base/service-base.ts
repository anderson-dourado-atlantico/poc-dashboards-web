import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'

export abstract class ServiceBase<M> {
  private _url = 'http://localhost:3000'

  private defaultOptions = {
    responseType: 'json' as const,
  }

  constructor(
    protected _http: HttpClient,
    protected _actionUrl: string,
  ) {}

  public get name() {
    return this._actionUrl
  }

  protected persist<T = M>(
    model: unknown,
    action = '',
    options?: unknown,
  ): Observable<T> {
    return this._http.post<T>(
      `${this._url}/${this._actionUrl}${action}`,
      model,
      this.getOptions(options),
    )
  }

  protected update<T = M>(
    model: unknown,
    id: string,
    action = '',
    options?: unknown,
  ): Observable<T> {
    let _url = `${this._url}/${this._actionUrl}`
    if (id !== null) {
      _url += `/${id}`
    }
    _url += `${action}`

    return this._http.put<T>(_url, model, this.getOptions(options))
  }

  protected delete(id: string, action = '', options?: unknown) {
    let _url = `${this._url}/${this._actionUrl}`
    if (id !== null) {
      _url += `/${id}`
    }
    _url += `${action}`

    return this._http
      .delete(_url, this.getOptions(options))
      .pipe(map(() => null))
  }

  protected get<T = M>(parameters: string, options?: unknown): Observable<T> {
    return this._http.get<T>(
      `${this._url}/${this._actionUrl}${parameters}`,
      this.getOptions(options),
    )
  }

  getAll<T = M>(): Observable<T[]> {
    return this.get<T[]>('')
  }

  private getOptions(options?: unknown) {
    let optionRet = this.defaultOptions
    if (options) optionRet = { ...this.defaultOptions, ...options }

    return optionRet
  }
}
