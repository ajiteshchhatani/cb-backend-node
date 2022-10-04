import { faker } from '@faker-js/faker';

export default function createRandomUser() {
    return {
        "id": faker.datatype.uuid(),
        "email": faker.internet.email(),
        "first_name": faker.name.firstName(),
        "last_name": faker.name.lastName(),
        "avatar": faker.image.avatar()
    }
}