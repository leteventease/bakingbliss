from http.server import HTTPServer, BaseHTTPRequestHandler
import cgi

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Parse the form data posted
        content_type, pdict = cgi.parse_header(self.headers['content-type'])
        if content_type == 'multipart/form-data':
            pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
            pdict['CONTENT-LENGTH'] = int(self.headers['content-length'])
            fields = cgi.parse_multipart(self.rfile, pdict)
            name = fields.get('name')[0].decode("utf-8")
            number = fields.get('number')[0].decode("utf-8")
            email = fields.get('email')[0].decode("utf-8")
            reason = fields.get('reason')[0].decode("utf-8")

            # Save the data to a file
            with open("user_data.txt", "a") as file:
                file.write(f"Name: {name}\nNumber: {number}\nEmail: {email}\nReason: {reason}\n\n")

            # Send response back to the client
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b"Registration complete. Check user_data.txt for saved details.")
        else:
            self.send_response(400)
            self.end_headers()

if __name__ == "__main__":
    httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
    print("Server started at http://localhost:8000")
    httpd.serve_forever()
