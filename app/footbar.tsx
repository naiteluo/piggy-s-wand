export default function Footerbar() {
  return (
    <footer className="bg-slate-300 py-4 w-full">
      <div className="container mx-auto flex items-center justify-between px-4 flex-col sm:flex-row">
        <div className="text-white flex flex-col">
          <p>© 2023 Naiteluo & Kujo. All rights reserved.</p>
          <p>
            Made with love and
            <a className="ml-1 text-red-400" href="https://nextjs.org/">
              Next.js
            </a>.
          </p>
        </div>
        <div>
          <a
            href="https://beian.miit.gov.cn"
            className="text-white hover:text-white mx-2"
          >         
            京ICP备2023014198号-1
          </a>
        </div>
      </div>
    </footer>
  );
}
