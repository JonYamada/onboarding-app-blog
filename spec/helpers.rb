module Helpers
  def expect_validation_thrown(record, field, opts = { error_message: "can't be blank" })
    expect(record).to_not be_valid
    expect(record.errors.messages[field].count).to be > 0
    expect(record.errors.messages[field][0]).to eq(opts[:error_message])
  end

  def expect_successfully_saved(new_record)
    model = new_record.class.name.constantize
    initial_record_count = model.count

    new_record.save

    expect(new_record).to be_valid
    expect(new_record.errors.messages.count).to eq(0)
    expect(model.count).to eq(initial_record_count + 1)
  end
end
