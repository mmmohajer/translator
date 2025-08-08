from websocket.consumers import test_socket, pdf_translator

TestSocketConsumer = test_socket.TestSocketConsumer.as_asgi()
TranslatePDFSocketConsumer = pdf_translator.TranslatePDFSocketConsumer.as_asgi()