import { useEffect, useContext } from 'react';
import { AuthContext } from "../../../../Components/Auth/AuthcontextProvider";

const UnitTwo = () => {
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
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="YbD0Lm1MNGyb9wNxdmHAA";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
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
        مهام  الموديول الثاني
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
        تخير أحد تطبيقات الواقع المعزز المناسب لمجال تخصصك و اذكر أهم مميزاته؟ 
      </div>
      <br />
      <div className="text-center text-bold">
        مهمة (2)  وهي : 
      </div>
      <br />
      <div className="text-center">
        قارن بين تطبيقين من تطبيقات الواقع المعزز التي درستها في هذا الموديول من حيث مميزات وعيوب كلٍ منهما ؟ 
      </div>
      <br />
      <div className="text-center text-bold">
        مهمة (3)  وهي : 
      </div>
      <br />
      <div className="text-center">
        تخير أحد معايير الواقع المعزز من الناحية ( التربوية و الفنية و التكنولوجية ) و قم بتطبيق شروطه  على مجال تخصصك 
      </div>
      <br />
      <div className="text-center text-red text-bold">قم برفع الملف بعد اكتماله لمعلمك على لينك الفورم المخصص لذلك</div>
      <br />
      <div className="text-center text-red text-bold"><a href='https://forms.office.com/r/7JVcwqpfr7'>لإرسال ملف المهمة اضغط هنا</a></div>
      <br />
    </div>
  );
};

// Create the content element using the component
const unit_two = <UnitTwo />;

// Export the content element
export default unit_two;
