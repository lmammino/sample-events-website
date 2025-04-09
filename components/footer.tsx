export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EventHub. A demo website... No rights reserved!</p>
        </div>
        <div className="flex gap-6">
          <>
            <a href="https://nodejsdesignpatterns.com" className="text-sm text-muted-foreground hover:text-foreground">
              Node.js Design Patterns, 4th Edition
            </a>
          </>
        </div>
      </div>
    </footer>
  )
}
