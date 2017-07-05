# apress-assets-table

### сборка проекта Yarn:
* ```dev``` - для разработки, вотчит и автоматически пересобирает
```bash
yarn run dev
```
* ```prod``` - делать перед коммитом, пока у нас все это лежит в репозитории.
```bash
yarn run prod
```
Как постаавить Yarn на санчес себе ?
```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```
#Новые зависимости ставить только через Yarn
```bash
yarn add
```
---
## Тесты:

ссылки:

+ [jest](https://facebook.github.io/jest/)
+ [enzyme](http://airbnb.io/enzyme/)
+ (https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f)
+ (http://redux.js.org/docs/recipes/WritingTests.html)
+ (https://youtu.be/59Ndb3YkLKA)

Тесты должны быть документацией к коду.
Описание теста пишем по русски во избежания недорозумений.

Как запускать ? (потом сделаем прекоммит хук)
```bash
yarn run test
yarn run test:watch
yarn run test:coverage
```
