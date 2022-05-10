p 'Seeding Users...'
User.create(first_name: 'jon', last_name: 'yams', email: 'jonathon.yamada@wpengine.com')

p 'Seeding Articles...'
7.times do |index|
  Article.create(
    title: "Title #{index}",
    content: "Lorem ipsum dolor sit amet. Qui expedita sapiente aut minima nesciunt et voluptas laboriosam ea voluptatibus nobis et possimus consequatur. Id amet omnis qui cupiditate quasi rem distinctio voluptatem qui galisum deserunt qui consectetur alias At expedita exercitationem cum nulla voluptas. Et doloribus repellat et nesciunt similique ut tenetur neque et reprehenderit quas ut quaerat ullam!",
    user_id: User.find_by_email('jonathon.yamada@wpengine.com').id
  )
end
