import mysql from 'serverless-mysql'

export default class MariaDB {
  private poolConfig: mysql.Config = {
    config: {
      host: process.env.NEXT_PUBLIC_HOST,
      port: +(process.env.NEXT_PUBLIC_PORT ?? 3306),
      database: process.env.NEXT_PUBLIC_DATABASE,
      user: process.env.NEXT_PUBLIC_USER,
      password: process.env.NEXT_PUBLIC_PASSWORD,
    },
  }
  private conn = mysql(this.poolConfig)

  private static Singleton = class {
    static readonly INSTANCE = new MariaDB()
  }
  static readonly getInstance = () => MariaDB.Singleton.INSTANCE
  transaction = () => this.conn.transaction()
  query = async <T extends any[]>(query: string, params: any[] = []) => {
    try {
      const res = await this.conn.query<T extends any[] ? T : any>(query, params)
      await this.conn.end()
      return res
    } catch (err) {
      if ((err as any).errno === 45017) err = { code: 500, message: '값이 존재하지 않습니다' }
      else if ((err as any).errno === 1064) err = { code: 500, message: '파라미터에 문제가 있습니다' }
      else if ((err as any).errno === 1062) err = { code: 500, message: '이미 존재하는 값입니다' } // 중복 insert

      await this.conn.end()
      throw err
    }
  }
}
