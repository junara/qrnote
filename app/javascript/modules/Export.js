import listIt from 'list-it'
import {format} from 'date-fns'
import ja from 'date-fns/locale/ja'
import {Setting, Url} from "./index";

const NO_DATA_STRING = 'なし'
export const toTextTable = (reservations) => {
  if (reservations.length === 0) return NO_DATA_STRING
  let buf = listIt.buffer();
  reservations.forEach((reservation) => {
    const day = format(reservation.get('startDate'), 'MM/DD(dd)', {locale: ja})
    const date = `${format(reservation.get('startDate'), 'Ahh:mm', {locale: ja})}-${format(reservation.get('endDate'), 'hh:mm', {locale: ja})}`
    const name = reservation.get('name')
    buf.d([day, date, name])
  })
  return (buf.toString())
}

export const sharedLinkMessage = (item) => {
  const name = item.get('name')
  const token = item.get('token')
  return (
    `${name} の予約表を作成しました。${"\n"}リンク先はこちらです${"\n"}${Url.item(token)}${"\n"}`
  )
}

export const mailItemHref = (item) => {
  const name = item.get('name')
  return (
    'mailto:' + '?subject=' + encodeURIComponent(`${name} の予約表 - ${Setting.appName}`) + '&body=' + encodeURIComponent(sharedLinkMessage(item))
  )
}
