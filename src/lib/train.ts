import trainDefault from '../assets/Train Default.svg'
import trainJT from '../assets/Train 東海道線.svg'
import trainOH from '../assets/Train 小田急線.svg'

export function getTrainPreview(name: string): string {
  switch (name) {
    case '東海道線':
      return trainJT
    case '小田原線':
    case '江ノ島線':
    case '多摩線':
      return trainOH
    default:
      return trainDefault
  }
}
