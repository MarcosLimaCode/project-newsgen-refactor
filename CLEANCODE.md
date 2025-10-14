# arquivo: news-repository.ts

- função getNoticias() tem nome utilizando palavras em inglês e português;
- função getNoticiaById() tem nome utilizando palavras em inglês e português;
- função createNoticia() tem nome utilizando palavras em inglês e português;
- função updateNoticia() tem nome utilizando palavras em inglês e português;
- função removeNoticia() tem nome utilizando palavras em inglês e português;

# arquivo: news-service.ts

- função validate() tem nome pouco semântico, não descreve exatamente qual validação está realizando;
- função validate() possui comentários;
- função validate() possui muitas responsabilidades;
- função validate() possui magic number, não é especificado o que o número 500 representa;
- função validate() possui muitas linhas;
- função alterNews() possui pouca semântica em validação do título;

# arquivo: error-handler.ts

- função errorHandlingMiddleware() possui muitos if-else;
