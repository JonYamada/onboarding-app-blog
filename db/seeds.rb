p 'Seeding Users...'
User.find_or_create_by!(first_name: 'jon', last_name: 'yams', email: 'jonathon.yamada@wpengine.com', password_digest: BCrypt::Password.create(ENV['seeds_user_password'])) if User.count.zero?

p 'Seeding Articles...'
20.times do |index|
  Article.find_or_create_by!(
    title: "Title #{index}",
    content: "Lorem ipsum dolor sit amet. Qui expedita sapiente aut minima nesciunt et voluptas laboriosam ea voluptatibus nobis et possimus consequatur. Id amet omnis qui cupiditate quasi rem distinctio voluptatem qui galisum deserunt qui consectetur alias At expedita exercitationem cum nulla voluptas. Et doloribus repellat et nesciunt similique ut tenetur neque et reprehenderit quas ut quaerat ullam!",
    user_id: User.find_by_email('jonathon.yamada@wpengine.com').id
  )
end
