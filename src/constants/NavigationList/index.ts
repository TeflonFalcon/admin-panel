interface INavigate {
  label: string
  path: string
}

const navigationList: INavigate[] = [
  { label: 'Жалобы', path: '/complaints' },
  { label: 'Модераторы', path: '/moderators' },
  { label: 'Обучение', path: '/education' },
  { label: 'Уведомление', path: '/notification' },
]

export default navigationList
