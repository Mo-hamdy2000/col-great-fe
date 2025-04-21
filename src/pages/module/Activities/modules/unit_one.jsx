import { useEffect, useContext } from 'react';
import { AuthContext } from "../../../../Components/Auth/AuthcontextProvider";

const UnitOne = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const loadChatScript = (scriptContent, scriptId) => {
      if (document.getElementById(scriptId)) {
        return;
      }

      const script = document.createElement('script');
      script.innerHTML = scriptContent;
      document.head.appendChild(script);
    };

    // Define both script contents
    const firstChatScript = `
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="ulrswDNCxoxY7cmwe0JEo";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
    `;

    const secondChatScript = `
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="BpGtjeNH3anG7ZGe2I0rG";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
    `;

    // Use ctx.isEven to determine which chat to use
    const useSecondChat = ctx.isAdmin;
    // const useSecondChat = true;

    // Load appropriate script based on condition
    if (useSecondChat) {
      loadChatScript(secondChatScript, '-KZqQ9i53JSg5G_2eO0JA');
    } else {
      loadChatScript(firstChatScript, 'qR1uqL3AFEbH5ij20P2-l');
    }

    // Cleanup function
    return () => {
      const firstScript = document.getElementById('qR1uqL3AFEbH5ij20P2-l');
      const secondScript = document.getElementById('-KZqQ9i53JSg5G_2eO0JA');
      if (firstScript) firstScript.remove();
      if (secondScript) secondScript.remove();
    };
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div>
      <u className="text-red text-bold text-large text-center">
      مهام  الموديول الأول
      </u>
      <br />
      <div className="text-bold">عزيزي الطالب / عزيزتي الطالبة انجز المهام الآتية: 
      باستخدام المساعد الافتراضي الموجود ببيئة التعلم الإلكترونية  قم بإنشاء ملف ورد عن مفاهيم، وخصائص أخرى للواقع المعزز ، وأهميته فى مجال تخصصك،  . ثم اعرض لأهم معوقات تطبيق الواقع المعزز  في مجال تخصصك </div>
      <br />
      {/* <div className="text-center">
        <img src={image11} alt="" />
      </div> */}
      <br />
      <div className="text-center text-bold">
        مهمة (1)  وهى:
      </div>
      <br />
      <div className="text-center">
        البحث عن مفاهيم أخرى للواقع المعزز ، ثم كتابتها  باختصار فى ملف الورد.
      </div>
      <br />
      <div className="text-center text-bold">
        مهمة (2)  وهي : 
      </div>
      <br />
      <div className="text-center">
        البحث عن خصائص أخرى للواقع المعزز ، ثم كتابتها  باختصار فى ملف الورد.
      </div>
      <br />
      <div className="text-center text-bold">
        مهمة (3)  وهي : 
      </div>
      <br />
      <div className="text-center">
        توضيح أهمية استخدام الواقع المعزز  في مجال التخصص ، ثم ضمنها فى ملف الورد السابق.
      </div>
      <br />
      <div className="text-center text-bold">
        مهمة (4)  وهي : 
      </div>
      <br />
      <div className="text-center">
        عرض لأهم معوقات تطبيق الواقع المعزز  في مجال التخصص ثم ضمنها فى ملف الورد السابق.
      </div>
      <br />
      <div className="text-center text-red text-bold">قم برفع الملف بعد اكتماله لمعلمك على لينك الفورم المخصص لذلك</div>
      <br />
      <div className="text-center text-red text-bold"><a href='https://forms.office.com/r/hgPP3gWThS'>لإرسال ملف المهمة اضغط هنا</a></div>
      <br />
    </div>
  );
};

// Create the content element using the component
const unit_one = <UnitOne />;

// Export the content element
export default unit_one;
