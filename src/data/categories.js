// Фото могут ссылаться на папку products: дублировать файлы не нужно.
export const categories = [
  {
    "id": "classic",
    "title": "Классические сумки",
    "subtitle": "Вне времени и трендов",
    "image": "/images/products/photo_2026-10-05_22-12-46 (2).jpg",
    "visible": true
  },
  {
    "id": "shoulder",
    "title": "Сумки на плечо",
    "subtitle": "В ритме вашего дня",
    "image": "/images/products/photo_2026-10-05_22-12-54.jpg",
    "visible": true
  },
  {
    "id": "bright",
    "title": "Яркие акценты",
    "subtitle": "Цвет, который чувствуется",
    "image": "/images/products/photo_2026-10-05_22-12-57.jpg",
    "visible": true
  },
  {
    "id": "details",
    "title": "Детали",
    "subtitle": "Маленькие важные вещи",
    "image": "/images/products/photo_2026-10-05_22-12-55 (2).jpg",
    "visible": true
  }
]
export const visibleCategories = categories.filter(category => category.visible !== false)
