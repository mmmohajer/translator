from websocket.consumers import test_socket, pdf_translator, chat_bot

TestSocketConsumer = test_socket.TestSocketConsumer.as_asgi()
TranslatePDFSocketConsumer = pdf_translator.TranslatePDFSocketConsumer.as_asgi()
ChatBotConsumer = chat_bot.ChatBotConsumer.as_asgi()